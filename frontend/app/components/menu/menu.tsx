
import { Link, useSearchParams } from "@remix-run/react";
import "./menu.scss";

function getMenuItemClass(params: URLSearchParams, contentType: string): string {

  if (!params.get('contentType') && contentType === '') {
    return 'menu__link--selected';
  }

  return params.get('contentType') === contentType ? 'menu__link--selected' : '';
}

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="menu">
      <Link className={"menu__link " + getMenuItemClass(searchParams, '')} to="/">everything</Link>
      <Link className={"menu__link " + getMenuItemClass(searchParams, 'videos')} to="?contentType=videos">videos</Link>
      <Link className={"menu__link " + getMenuItemClass(searchParams, 'photos')} to="?contentType=photos">photos</Link>
      <Link className={"menu__link " + getMenuItemClass(searchParams, 'quotes')} to="?contentType=quotes">quotes</Link>
      <Link className={"menu__link " + getMenuItemClass(searchParams, 'trips')} to="?contentType=trips">trips</Link>
      <Link className={"menu__link " + getMenuItemClass(searchParams, 'stories')} to="?contentType=stories">stories</Link>
    </div>
  )
}