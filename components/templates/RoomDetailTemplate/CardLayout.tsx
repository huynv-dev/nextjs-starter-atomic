'use client';
export const CardLayout = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <div className={`rounded-2xl shadow-lg shadow-black/20 p-3 ${classNames}`}>
      {children}
    </div>
  );
};
