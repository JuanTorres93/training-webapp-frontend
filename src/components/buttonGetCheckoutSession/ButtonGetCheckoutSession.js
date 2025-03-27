// TODO DELETE THIS COMPONENT. WAS JUST FOR TESTING
import ButtonIconAndText from "../buttonIconAndText/ButtonIconAndText";
import { getCheckoutSession } from "../../serverAPI/payments";

const ButtonGetCheckoutSession = ({ disabled = false, isLoading = false }) => {
  // TODO translate
  const text = "Get Checkout Session";

  const getCheckoutSessionOnClick = async () => {
    const response = await getCheckoutSession();

    window.location = response.session.url;
  };

  return (
    <ButtonIconAndText
      // ionIcon={<IonIcon name="bag-handle-outline" />}
      text={text}
      onClick={getCheckoutSessionOnClick}
      // TODO Create class?
      extraClasses="button-get-checkout-session"
      disabled={disabled}
      isLoading={isLoading}
    />
  );
};

export default ButtonGetCheckoutSession;
