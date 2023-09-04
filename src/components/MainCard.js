import PropTypes from "prop-types";
import React from "react";
import config from "../config";

const MainCard = React.forwardRef(
  (
    {
      cardTitle,
      showInfoIcon,
      infoIconContent,
      content = true,
      contentClass,
      contentSX,
      cardAction,
      contentHeight,
      isLoadingSpin,
      children,
      isCard,
      showNoDataText,
      isFeatureDisabled,
      type = "",
      ...others
    },
    ref
  ) => {
    return (
      <div
        style={{
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          width: "480px",
          height: "256px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: "18px",
                lineHeight: "21.94px",
                position: "absolute",
                left: "30px",
                top: "40px",
                margin: "0px",
              }}
            >
              {cardTitle}
            </p>
          </div>
          <div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                lineHeight: "14.94px",
                fontWeight: "400",
                position: "absolute",
                fontSize: "12px",
                color: "#858585",
                top: "34px",
                left: "327px",
                margin: "0px",
              }}
            >
              {cardAction}
            </div>
          </div>
        </div>

        <div
          style={{
            height: contentHeight,
            width: "100%",
            position: "relative",
            maxHeight: "194px",
          }}
        >
          {/* Overlay Feature */}
          {isFeatureDisabled && (
            <div>
              <p>This feature will be available with one month's data</p>
            </div>
          )}

          {!children && !isLoadingSpin && showNoDataText && (
            <p>Data Not Found</p>
          )}
          {/* card Content  */}
          {children ? children : null}
        </div>
      </div>
    );
  }
);

MainCard.propTypes = {
  isCard: PropTypes.bool,
  showNoDataText: PropTypes.bool,
  showInfoIcon: PropTypes.bool,
  infoIconContent: PropTypes.string,
  cardTitle: PropTypes.string,
  contentHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLoadingSpin: PropTypes.bool.isRequired,
  children: PropTypes.node,
  cardAction: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  isFeatureDisabled: PropTypes.bool,
};

MainCard.defaultProps = {
  cardTitle: "Card Title",
  contentHeight: 350,
  isLoadingSpin: false,
  isCard: true,
  showNoDataText: true,
  showInfoIcon: false,
  infoIconContent: "Sample Text",
  isFeatureDisabled: false,
};

export default MainCard;
