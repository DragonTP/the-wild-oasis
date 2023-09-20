import { useCheckWindowSize } from '../../hooks/useCheckWindowSize';
import Button from '../../ui/Button';
import Filter from '../../ui/Filter';
import Modal from '../../ui/Modal';

function DashboardFilter() {
  const showBtn = useCheckWindowSize(480);

  return (
    <>
      {showBtn ? (
        <Modal>
          <Modal.Open>
            <Button>Filter dashboard</Button>
          </Modal.Open>
          <Modal.Window>
            <Modal.Filter>
              <Filter style={{ flexDirection: 'column', gap: '2rem' }}
                filterField='last'
                options={[
                  { value: '7', label: 'Last 7 days' },
                  { value: '30', label: 'Last 30 days' },
                  { value: '90', label: 'Last 90 days' },
                ]}
              />
            </Modal.Filter>
          </Modal.Window>
        </Modal>
      ) : <Filter
        filterField='last'
        options={[
          { value: '7', label: 'Last 7 days' },
          { value: '30', label: 'Last 30 days' },
          { value: '90', label: 'Last 90 days' },
        ]}
      />}
    </>
  );
}

export default DashboardFilter;
