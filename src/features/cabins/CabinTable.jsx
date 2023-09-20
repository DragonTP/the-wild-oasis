import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from './CabinRow';
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>

  const filterValue = searchParams.get('discount') || 'all';
  const sortValue = searchParams.get('sortBy') || '';

  let filteredCabins, sortedCabins;

  switch (filterValue) {
    case 'with-discount':
      filteredCabins = cabins.filter(cabin => cabin.discount);
      break;
    case 'no-discount':
      filteredCabins = cabins.filter(cabin => !cabin.discount);
      break;
    default:
      filteredCabins = cabins;
  }

  switch (sortValue) {
    case 'name-desc':
      sortedCabins = filteredCabins.toSorted((a, b) => -a.name.localeCompare(b.name));
      break;
    case 'regularPrice-asc':
      sortedCabins = filteredCabins.toSorted((a, b) => a.regularPrice - b.regularPrice);
      break;
    case 'regularPrice-desc':
      sortedCabins = filteredCabins.toSorted((a, b) => b.regularPrice - a.regularPrice);
      break;
    case 'maxCapacity-asc':
      sortedCabins = filteredCabins.toSorted((a, b) => a.maxCapacity - b.maxCapacity);
      break;
    case 'maxCapacity-desc':
      sortedCabins = filteredCabins.toSorted((a, b) => b.maxCapacity - a.maxCapacity);
      break;
    default:
      sortedCabins = filteredCabins.toSorted((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <Menus>
      <Table columns='0.5fr 1.6fr 2.2fr 1.3fr 1.2fr 3.2rem' responsive={{
        columns: '4.8rem 12rem 12rem 12rem 12rem 3.2rem',
        breakpoint: 645,
      }}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={cabin => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  )
}

export default CabinTable
