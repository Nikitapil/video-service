import Tab from './Tab.tsx';

interface ITab<T> {
  value: T;
  title: string;
}

interface TabsProps<T extends string> {
  tabs: ITab<T>[];
  activeTab: T;
  setActiveTab: (value: T) => void;
}

const Tabs = <T extends string>({ tabs, activeTab, setActiveTab }: TabsProps<T>) => {
  return (
    <div className="flex w-full items-center">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          text={tab.title}
          isActive={activeTab === tab.value}
          clickHandler={() => setActiveTab(tab.value)}
        />
      ))}
    </div>
  );
};

export default Tabs;
