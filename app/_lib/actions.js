"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import {
  createBooking,
  deleteBooking,
  getBooking,
  updateBooking,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut("google", {
    redirectTo: "/login",
  });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session)
    throw new Error("Only authenticated users can delete their reservations!");
  const booking = await getBooking(bookingId);
  if (booking.guestId === session.user.id) {
    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
  } else throw new Error("You are not allowed to delete this booking");
}

export async function updateBookingAction(formData) {
  const bookingId = formData.get("bookingId");
  const updatedFields = {
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };
  const session = await auth();
  if (!session)
    throw new Error("Only authenticated users can update their reservations!");
  const booking = await getBooking(bookingId);
  if (booking.guestId === session.user.id) {
    await updateBooking(bookingId, updatedFields);
    revalidatePath("/account/reservations");
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect("/account/reservations");
  } else throw new Error("You are not allowed to update this booking");
}

export async function createBookingAction(bookingData) {
  const session = await auth();
  if (!session)
    throw new Error("Only authenticated users can create new reservations!");

  const newBooking = {
    ...bookingData,
    guestId: session.user.id,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(newBooking);
  revalidatePath(`/cabins/${newBooking.cabinId}`);
}
