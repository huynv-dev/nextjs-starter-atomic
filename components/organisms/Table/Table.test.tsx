import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';
import { ColumnType } from '@/types/table';

interface User {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnType[] = [
  { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left', width: 150 },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address', width: 300 },
  {
    title: 'Action',
    key: 'action',
    render: () => <button>Edit</button>,
    fixed: 'right',
    width: 100,
  },
];

const data: User[] = [
  { key: '1', name: 'John Doe', age: 32, address: '123 Street' },
  { key: '2', name: 'Jane Doe', age: 28, address: '456 Avenue' },
];

describe('Table', () => {
  it('renders table with data', () => {
    render(<Table columns={columns} dataSource={data} rowKey="key" />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('shows loading indicator when loading is true', () => {
    render(<Table columns={columns} dataSource={[]} loading />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders checkbox when rowSelection is enabled', () => {
    render(
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        rowSelection={{
          selectedRowKeys: ['1'],
          onChange: jest.fn(),
        }}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('renders expanded row when expandedRowRender is provided', () => {
    render(
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        expandable={{
          expandedRowKeys: ['1'],
          expandedRowRender: (record) => <div>Expanded {record.name}</div>,
        }}
      />
    );

    expect(screen.getByText('Expanded John Doe')).toBeInTheDocument();
  });

  it('applies fixed column styles', () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} rowKey="key" scroll={{ x: 1000 }} />
    );

    const firstCell = container.querySelector('td.sticky.left-0');
    const lastCell = container.querySelector('td.sticky.right-0');

    expect(firstCell).toBeInTheDocument();
    expect(lastCell).toBeInTheDocument();
  });

  it('calls onRow.onClick when a row is clicked', () => {
    const handleClick = jest.fn();

    render(
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        onRow={(record) => ({
          onClick: () => handleClick(record.key),
        })}
      />
    );

    const row = screen.getByText('John Doe').closest('tr')!;
    fireEvent.click(row);

    expect(handleClick).toHaveBeenCalledWith('1');
  });
});
