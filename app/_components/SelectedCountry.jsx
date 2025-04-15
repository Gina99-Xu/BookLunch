import { getCountries } from "../_lib/data-service"

export default async function SelectedCountry({ name, defaultCountry, id, className }) {
  const countries = await getCountries();

  return (
    <select className={className} name={name} id={id} defaultValue={defaultCountry}>
      <option value=''>Select My Country</option>
      {countries.map(c =>
        <option key={c.name} value={c.name}>{c.name}</option>)
      }
    </select >
  )
}