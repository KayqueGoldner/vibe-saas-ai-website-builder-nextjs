interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <main className="flex max-h-screen min-h-screen flex-col">
      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="bg-background absolute inset-0 -z-10 size-full bg-[radial-gradient(#DADDE2_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#393E4A_1px,transparent_1px)]" />
        {children}
      </div>
    </main>
  );
};

export default HomeLayout;
