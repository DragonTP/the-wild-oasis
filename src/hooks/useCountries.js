import { useQuery } from "@tanstack/react-query"

export const useCountries = () => {
  const { isLoading, data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await fetch('https://restcountries.com/v2/all');
      const data = await res.json();
      return data
    }
  })
  return { isLoading, countries }
}