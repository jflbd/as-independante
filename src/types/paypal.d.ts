declare namespace PayPal {
  interface CreateOrderData {
    paymentSource?: string;
    [key: string]: unknown;
  }

  interface ButtonsConfig {
    style?: {
      color?: string;
      shape?: string;
      label?: string;
      height?: number;
    };
    createOrder: (data: CreateOrderData, actions: OrderActions) => Promise<string>;
    onApprove: (data: ApproveData, actions: OrderActions) => Promise<void>;
    onCancel?: () => void;
    onError?: (err: unknown) => void;
  }

  interface OrderActions {
    order: {
      create: (orderData: OrderData) => Promise<string>;
      capture: () => Promise<OrderDetails>;
    };
  }

  interface OrderData {
    purchase_units: Array<{
      amount: {
        value: string;
        currency_code: string;
      };
      description?: string;
    }>;
  }

  interface ApproveData {
    orderID: string;
  }

  interface OrderDetails {
    id: string;
    payer?: {
      name?: {
        given_name?: string;
      };
    };
  }
}

interface Window {
  paypal?: {
    Buttons: (config: PayPal.ButtonsConfig) => {
      render: (selector: string) => void;
    };
  };
}