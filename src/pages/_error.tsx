import NextErrorComponent, { ErrorProps } from "next/error";
import { NextPageContext } from "next";
import { Error } from "../views/error/Error";

export default function ErrorPage() {
  return <Error />;
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext): Promise<ErrorProps> => {
  const errorInitialProps: ErrorProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext)) as ErrorProps;

  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};
