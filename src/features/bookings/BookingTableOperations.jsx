import { useCheckWindowSize } from "../../hooks/useCheckWindowSize";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function BookingTableOperations() {
  const showBtn = useCheckWindowSize(605);

  return (
    <TableOperations $breakpoint={[1170, 797]}>
      {showBtn ? (
        <>
          <Modal.Open>
            <Button>Filter bookings</Button>
          </Modal.Open>
          <Modal.Window>
            <Modal.Filter>
              <Filter style={{ flexDirection: 'column', gap: '2rem' }}
                filterField="status"
                options={[
                  { value: "all", label: "All" },
                  { value: "checked-out", label: "Checked out" },
                  { value: "checked-in", label: "Checked in" },
                  { value: "unconfirmed", label: "Unconfirmed" },
                ]}
              />
            </Modal.Filter>
          </Modal.Window>
        </>
      ) : <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />}

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
