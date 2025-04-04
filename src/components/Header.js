import divi_Logo from "../images/DiviPlusLogo.png";


const Header = ({ colors, setSearchText }) => {
    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(73, 94, 87)",
        height: "10vh",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "0 3vw", 
        boxSizing: "border-box",
    };

    const logoStyle = {
        height: "10vh",
        maxHeight: "60px",
        width: "auto",
        flexShrink: 0
    };


    return (
        <header style={headerStyle}>
            <img src={divi_Logo} alt="DiviPlus_LOGO" style={logoStyle} />
        </header>
    );
};

export default Header;
