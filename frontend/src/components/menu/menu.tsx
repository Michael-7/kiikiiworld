"use client"

import "./menu.module.scss";
import Link from 'next/link';
import { categories } from '#site/content';
import { useSearchParams } from "next/navigation";

function getMenuItemClass(filter: string | undefined | null, contentType: string): string {
  if (contentType === '' && !filter) {
    return 'menu__link--selected';
  }

  return filter === contentType ? 'menu__link--selected' : '';
}

export default function Menu() {
  const filter = useSearchParams()?.get('filter');

  return (
    <div className="menu">
      <Link className={"menu__link " + getMenuItemClass(filter, '')} href={`/`}>Everything</Link>
      { categories.map(cat => {
        return <Link className={"menu__link " + getMenuItemClass(filter, cat.slug)} key={cat.slug} href={`/?filter=${cat.slug}`}>{cat.name}</Link>
      })}
    </div>
  )
}