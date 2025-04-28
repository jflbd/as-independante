// Types spécifiques pour PayPal
export interface PayPalOrderAddress {
  address_line_1?: string;
  address_line_2?: string;
  admin_area_1?: string; // État/Province/Région
  admin_area_2?: string; // Ville
  postal_code?: string;
  country_code: string;
}

export interface PayPalOrderAmount {
  currency_code: string;
  value: string;
}

export interface PayPalPurchaseUnit {
  description?: string;
  amount: PayPalOrderAmount;
  shipping?: {
    address: PayPalOrderAddress;
  };
}

export interface PayPalOrderData {
  purchase_units: PayPalPurchaseUnit[];
  payer?: {
    email_address?: string;
    name?: {
      given_name: string;
      surname: string;
    };
  };
}

export interface PayPalOrderResponseData {
  id: string;
  status: string;
  purchase_units: Array<{
    reference_id: string;
    amount: PayPalOrderAmount;
    shipping?: {
      address: PayPalOrderAddress;
    };
  }>;
  payer: {
    email_address: string;
    payer_id: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  create_time: string;
  update_time: string;
}

export interface PayPalActions {
  order: {
    create: (order: PayPalOrderData) => Promise<string>;
    capture: () => Promise<PayPalOrderResponseData>;
    get: () => Promise<PayPalOrderResponseData>;
  };
}

export interface PayPalButtonsOptions {
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
    height?: number;
  };
  createOrder: (data: unknown, actions: PayPalActions) => Promise<string>;
  onApprove: (data: {orderID: string}, actions: PayPalActions) => Promise<void>;
  onCancel?: (data: {orderID?: string}) => void;
  onError?: (error: Error) => void;
}

export interface PayPalButtonsComponent {
  render: (element: HTMLElement) => void;
  isEligible?: () => boolean;
}

export interface PayPalSDK {
  Buttons: (options: PayPalButtonsOptions) => PayPalButtonsComponent;
}