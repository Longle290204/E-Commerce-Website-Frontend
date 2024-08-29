import "./Global.module.scss";
import PropTypes from "prop-types";

function GlobalStyles({ children }) {
    return <div>{children}</div>;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
