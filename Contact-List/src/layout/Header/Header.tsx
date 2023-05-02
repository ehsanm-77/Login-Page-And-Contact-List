const Header = ({ setMode, mode }: any) => {
  return (
    <div className="text-xl md:text-3xl font-bold text-center mb-3 text-white bg-[url(./src/assets/img/header.jpg)] bg-cover bg-center relative rounded-b-full top-0 p-2 drop-shadow-md">
      <p className="drop-shadow-md">وب اپلیکیشن مدیریت مخاطبین</p>
      <button
        className="absolute left-10 text-sm top-2 bg-white rounded-full p-1"
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      >
        {mode === 'dark' ? (
          <img src="./src/assets/img/moon.svg" alt="aa" />
        ) : (
          <img src="./src/assets/img/sun.svg" alt="aa" />
        )}
      </button>
    </div>
  );
};
export default Header;
