import './style.scss';

const ErrorField = ({ textError }) => {
  return (
    <p className="error">
      {textError}
    </p>
  );
}

export default ErrorField;
