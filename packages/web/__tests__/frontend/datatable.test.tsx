import { screen, render, waitFor } from '@testing-library/react';
import DataTableWithModal from 'components/DatatableWithModal';
import { TableData } from 'lib/interfaces';

describe('Empty table', () => {
  test('Should render an empty table', async () => {
    render(<DataTableWithModal data={[]} />);
    await waitFor(() =>
      expect(screen.getByText(/no messages/i)).toBeInTheDocument()
    );
  });
});

const data: TableData[] = [
  {
    id: '1',
    email: 'customer1@mail.com',
    subject: 'This is a great product',
    priority: 'normal',
    keyPhrases: ['phone'],
    hasListedTags: true,
    date: String(Date.now()),
    status: 'open',
  },
  {
    id: '2',
    email: 'customer2@mail.com',
    subject: 'This is a Bad product',
    priority: 'high',
    keyPhrases: ['laptop'],
    hasListedTags: false,
    date: String(Date.now()),
    status: 'open',
  },
];

describe('Table with messages', () => {
  beforeEach(() => render(<DataTableWithModal data={data} />));
  test('Should render table with 2 records', async () => {
    await waitFor(() => screen.getByRole('table'));
    const messageRows = screen.getAllByTestId('msg-row');
    expect(messageRows).toHaveLength(2);
  });
});
