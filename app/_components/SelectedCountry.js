import { getCountries } from "../_lib/data-service"

export default async function SelectedCountry({ className }) {
  const countries = await getCountries();

  const flag = countries?.find(country => country.name === 'China')

  return (
    <select className={className}>
      <option value=''>Select country...</option>
      {countries.map(c =>
        <option key={c.name} value={`${c.name}%${c.flag}`} > {c.name}</option>)
      }
    </select >
  )
}