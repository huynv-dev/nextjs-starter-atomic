import Link from 'next/link'
import styles from './headerNav.module.css'

export const HeaderNav = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>MyShop</Link>
      <nav className={styles.nav}>
        <Link href="/products">Products</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  )
}
