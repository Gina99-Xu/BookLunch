import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

export const getProperty = async function (propertyId) {

  revalidatePath(`/properties/${propertyId}`)
  const { data, error } = await supabase.from('properties')
    .select('*')
    .eq('id', propertyId)
    .single()

  if (error) {
    console.log(error);
    notFound();
  }

  return data;
}
export const getProperties = async function () {

  revalidatePath('/properties')
  const { data, error } = await supabase.from('properties')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error('Properties cannot be loaded')
  }

  return data;
}



export async function getCountries() {
  try {
    const res = await fetch("https://restcountries.com/v2/all?fields=name,flag");
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Error while fetching countries")
  }
}