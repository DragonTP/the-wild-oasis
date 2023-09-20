import { useCheckWindowSize } from "../../hooks/useCheckWindowSize";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function CabinTableOperations() {
  const showBtn = useCheckWindowSize(467);

  return (
    <TableOperations>
      {showBtn ? (
        <Modal>
          <Modal.Open>
            <Button>Filter cabins</Button>
          </Modal.Open>
          <Modal.Window>
            <Modal.Filter>
              <Filter style={{ flexDirection: 'column', gap: '2rem' }}
                filterField='discount' options={[
                  { value: 'all', label: 'All' },
                  { value: 'no-discount', label: 'No discount' },
                  { value: 'with-discount', label: 'With discount' }]}
              />
            </Modal.Filter>
          </Modal.Window>
        </Modal>
      ) : <Filter
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' }]}
      />}

      <SortBy options={[
        { value: 'name-asc', label: 'Sort by name (A-Z)' },
        { value: 'name-desc', label: 'Sort by name (Z-A)' },
        { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
        { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
        { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
        { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
      ]} />
    </TableOperations>
  )
}

export default CabinTableOperations
