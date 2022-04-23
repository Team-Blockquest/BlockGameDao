const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className='text-center text-capitalize'>
                copyright Zuri Schools &copy; {year}
            </footer>
        </>
    )
}

export default Footer;