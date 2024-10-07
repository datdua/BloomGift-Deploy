import PropTypes from "prop-types";
import React from "react";
import { changeLanguage } from "redux-multilanguage";

const LanguageCurrencyChanger = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch
}) => {
  console.log('Current language code:', currentLanguageCode);

  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    console.log('Changing language to:', languageCode);
    dispatch(changeLanguage(languageCode));
  };


  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    setCurrency(currencyName);
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === "vi"
            ? "Tiếng Việt"
            : currentLanguageCode === "en"
              ? "English"
              : currentLanguageCode === "de"
                ? "Germany"
                  : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
          <li>
            <button value="vi" onClick={e => changeLanguageTrigger(e)}>
                Tiếng Việt
              </button>
            </li>
            <li>
              <button value="en" onClick={e => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="de" onClick={e => changeLanguageTrigger(e)}>
                Germany
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>Hotline 0905558630</p>
      </div>
    </div>
  );
};


LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};


export default LanguageCurrencyChanger;