type Price = number & { readonly __brand: unique symbol };
type Currency = "EUR";
type Money = {
  readonly amount: Price;
  readonly currency: Currency;
};

type Email = string & { readonly __brand: unique symbol };

type ProjectId = string & { readonly __brand: unique symbol };
