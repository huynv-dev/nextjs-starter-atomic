'use client';
import { ReactNode, useState } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import Modal from '@/components/organisms/Modal/Modal';

interface Feature {
  icon: ReactNode;
  label: string;
}

interface FeatureGroup {
  title: string;
  items: Feature[];
}

interface RoomFeaturesProps {
  title: string;
  features: Feature[];
  featureGroups: FeatureGroup[];
  buttonLabel?: string;
}

export function RoomFeatures({
  title,
  features,
  featureGroups,
  buttonLabel = 'Hiển thị tất cả',
}: RoomFeaturesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Typography level={3} className="font-semibold">{title}</Typography>

      <div className="grid grid-cols-2 gap-5 mt-4">
        {features.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            {item.icon}
            <Typography>{item.label}</Typography>
          </div>
        ))}
      </div>

      <Button
        type="secondary"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="bg-gray-100 rounded-xl text-sm font-semibold mt-2 hover:bg-gray-200"
      >
        {buttonLabel}
      </Button>

      <Modal
        className="!rounded-3xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        width={785}
        title={title}
        closePosition="left"
        showFooter={false}
        styleContent="!pr-0 !pl-6"
      >
        <div className="max-h-96 overflow-y-scroll">
          {featureGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-10">
              <Typography level={2} className="font-semibold mb-6">{group.title}</Typography>
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <div className="flex items-center gap-3 text-sm my-6">
                    {item.icon}
                    <Typography>{item.label}</Typography>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
