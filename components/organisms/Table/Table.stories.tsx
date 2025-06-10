import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Table from './Table';
import { ColumnType, TableProps } from '@/types/table';
import { Button } from '@/components/atoms/Button/Button';

const meta: Meta<TableProps<any>> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
    bordered: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    loading: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    showHeader: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    rowHoverable: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    pagination: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    className: {
      control: { type: 'text' },
    },
    title: { control: false },
    footer: { control: false },
    rowSelection: { control: false },
    expandable: { control: false },
    scroll: { control: false },
    rowClassName: { control: false },
    sticky: { control: false },
    virtual: { control: false },
    onChange: { control: false },
    onRow: { control: false },
    onHeaderRow: { control: false },
    dataSource: { control: false },
    columns: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

interface User {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  status: 'active' | 'inactive';
}

const userData: User[] = Array.from({ length: 30 }, (_, i) => ({
  key: String(i + 1),
  name: `Edward King ${i + 1}`,
  age: i + 20,
  address: `${i % 2 == 0 ? 'London' : 'USA'}`,
  tags: ['developer', 'designer'],
  status: i % 2 === 0 ? 'active' : 'inactive',
}));


const columns: ColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: User, b: User) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: User, b: User) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',

    render: (tags: string[]) => tags.join(', '),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value: string, record: User) => record.status === value,
    render: (status: string) => (
      <span style={{ color: status === 'active' ? 'green' : 'red' }}>
        {status.toUpperCase()}
      </span>
    ),
  },
];

export const Basic: Story = {
  args: {
    dataSource: userData,
    columns: columns,
    rowKey: 'key',
    size: 'middle',
    bordered: true,
  },
};

export const SmallSize: Story = {
  args: {
    dataSource: userData.slice(0, 3),
    columns: columns,
    rowKey: 'key',
    size: 'small',
    bordered: true,
  },
};

export const LargeSize: Story = {
  args: {
    dataSource: userData,
    columns: columns,
    rowKey: 'key',
    size: 'large',
    bordered: true,
  },
};

export const LoadingState: Story = {
  args: {
    dataSource: [],
    columns: columns,
    rowKey: 'key',
    loading: true,
  },
};

export const WithPagination: Story = {
  args: {
    dataSource: [...userData],
    columns: columns,
    rowKey: 'key',
    pagination: true,
  },
};

export const WithCustomPagination: Story = {
  args: {
    dataSource: [...userData],
    columns: columns,
    rowKey: 'key',
    pagination: {
      position: 'center',
      showSizeChanger: true,
      showQuickJumper: true,
    },
  },
};

export const WithRowSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    return (
      <Table
        dataSource={userData}
        columns={columns}
        rowKey="key"
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (keys) => setSelectedKeys(keys as string[]),
          onSelect: action('onSelect'),
          onSelectAll: action('onSelectAll'),
        }}
      />
    );
  },
};

export const WithRadioSelection: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string>('');

    return (
      <Table
        dataSource={userData}
        columns={columns}
        rowKey="key"
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedKey ? [selectedKey] : [],
          onChange: (keys) => setSelectedKey(keys[0] as string),
        }}
      />
    );
  },
};

export const WithExpandableRows: Story = {
  args: {
    dataSource: userData,
    columns: columns,
    rowKey: 'key',
    expandable: {
      expandedRowRender: (record: any) => (
        <div style={{ padding: '16px', background: '#f9f9f9' }}>
          <p>Details for {record.name}:</p>
          <p>Age: {record.age}</p>
          <p>Address: {record.address}</p>
          <p>Status: {record.status}</p>
        </div>
      ),
      rowExpandable: (record: any) => record.status === 'active',
    },
  },
};

export const WithCustomTitleAndFooter: Story = {
  args: {
    dataSource: userData,
    columns: columns,
    rowKey: 'key',
    title: () => <h2 style={{ margin: 0 }}>User Management</h2>,
    footer: (data) => `Total: ${data?.length} users`,
  },
};

export const WithScroll: Story = {
  args: {
    dataSource: [...userData, ...userData, ...userData],
    columns: [
      ...columns,
      {
        title: 'Actions',
        key: 'actions',
        render: () => <Button size="sm">Edit</Button>,
      },
    ],
    rowKey: 'key',
    scroll: { y: 300, x: 800 },
  },
};

export const WithFixedColumns: Story = {
  args: {
    dataSource: userData,
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        fixed: 'left',
      },
      ...columns.slice(1, -1),
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 150,
      },
    ],
    rowKey: 'key',
    scroll: { x: 1000 },
  },
};

export const WithCustomRowClassName: Story = {
  args: {
    dataSource: userData,
    columns: columns,
    rowKey: 'key',
    rowHoverable: false,
    rowClassName: (record: Record<string, any>, index: number) =>
      record.status === 'active' ? 'bg-green-200' : 'bg-red-100',
  },
};

export const WithOnRowClick: Story = {
  args: {
    dataSource: userData,
    columns: columns,
    rowKey: 'key',
    onRow: (record) => ({
      onClick: () => alert(record.name),
    }),
  },
};

export const WithFilterDropdown: Story = {
  args: {
    dataSource: userData,
    columns: [
      ...columns.slice(0, 2),
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          { text: 'London', value: 'london' },
          { text: 'USA', value: 'usa' },
        ],
        filterSearch: true,
        filterMultiple: false,
        onFilter: (value, record) => {
          return record.address.toLowerCase().includes(value);
        }
      },
      ...columns.slice(3),
    ],
    rowKey: 'key',
  },
};

