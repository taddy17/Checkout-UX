
import React from 'react';

interface IconProps {
    className?: string;
}

export const BankIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);

export const WalletIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m15 0a2.25 2.25 0 012.25 2.25v3.75a2.25 2.25 0 01-2.25 2.25H9A2.25 2.25 0 016.75 18v-3.75a2.25 2.25 0 012.25-2.25h9z" />
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);


export const ApplePayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apple Pay">
        <title>Apple Pay</title>
        <path fill="#fff" d="M20.211 18.043c-.767 0-1.513-.25-2.218-.729a4.423 4.423 0 0 1-1.636-2.218c-.464-1.218-.214-2.607.661-3.562.875-.955 2.232-1.286 3.545-1.027.232.045.473.116.705.188a.723.723 0 0 1 .536.83c-.09.384-.429.616-.813.527-.241-.054-.482-.107-.723-.152-1.009-.188-2.063.036-2.75.723-.715.687-.9 1.768-.536 2.687.366.92.107 1.482-.804 1.482zm-2.125 3.321c.563-.304 1.018-.759 1.34-1.339.321.464.714.83 1.16 1.098.447.268.911.402 1.393.402.045 0 .08 0 .125-.009.438-.045.857-.205 1.25-.491.402-.286.732-.67.973-1.125.25-.455.384-.964.384-1.5V17.3c0-.366-.232-.678-.58-.795-.348-.116-.723-.044-1.009.187-.803.66-1.768.955-2.884.83-.884-.107-1.705-.59-2.312-1.428-.608-.839-.992-1.857-1.108-3.009-.116-1.152.09-2.286.58-3.33.492-1.045 1.242-1.929 2.188-2.58.947-.652 2.054-.991 3.233-.991.67 0 1.321.134 1.937.402.545.223.955.518 1.447.964.214.205.5.304.794.286.295-.018.572-.178.742-.42.17-.241.223-.553.151-.848a5.21 5.21 0 0 0-1.83-2.348c-.687-.42-1.446-.714-2.267-.857-1.268-.223-2.536 0-3.705.58-.937.455-1.758 1.16-2.428 2.062a7.11 7.11 0 0 0-1.625 4.509c0 1.625.562 3.16 1.58 4.41.072.08.152.16.233.233a.721.721 0 0 1-.509 1.25c-.09 0-.188-.018-.286-.054zM26.47 14.545h-2.16c-.366 0-.66.295-.66.66v5.822c0 .366.294.66.66.66h.741c.366 0 .66-.294.66-.66v-2.16h1.42c1.946 0 2.928-1.16 2.928-2.651s-.982-2.67-2.928-2.67zm.044 3.991h-1.464v-2.67h1.464c1.16 0 1.58.58 1.58 1.33s-.42 1.34-1.58 1.34zM32.06 14.545h-2.5c-.34 0-.625.25-.66.58l-1.384 5.92c-.063.277.062.562.33.687.277.125.59.044.75-.205l.33-1.045h2.455l.33 1.045c.16.25.474.33.75.205.27-.125.394-.41.33-.687l-1.384-5.92c-.035-.33-.32-.58-.66-.58zm-1.25 3.99l.607-2.58.607 2.58h-1.214zM10.273 14.545l-1.92 4.312-1.92-4.312h-1.026l2.58 5.625c.16.34.5.553.866.553.366 0 .705-.214.866-.553l2.58-5.625h-1.026zM14.71 14.545c-2.008 0-3.267 1.482-3.267 3.518s1.26 3.518 3.268 3.518c2.008 0 3.267-1.482 3.267-3.518s-1.26-3.518-3.268-3.518zm0 5.696c-1.205 0-1.884-.982-1.884-2.178s.68-2.179 1.884-2.179c1.206 0 1.884.982 1.884 2.18s-.679 2.178-1.884 2.178z"></path>
    </svg>
);

export const GooglePayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 60 24" aria-label="Google Pay">
        <title>Google Pay</title>
        <path d="M30.735 9.243v5.42h-1.44V9.243h1.44zm6.68.99c.67 0 1.2.115 1.585.344.385.23.684.564.897.99.213.428.32.924.32 1.475v.23c0 .552-.107 1.048-.32 1.476a2.6 2.6 0 0 1-.9 1.012c-.384.23-.897.344-1.584.344h-2.19v-5.87h2.19zm-.628 4.54c.552 0 .97-.137 1.253-.41.282-.275.423-.685.423-1.22v-.23c0-.535-.14-.945-.422-1.22-.283-.274-.7-.41-1.254-.41h-1.44v3.49h1.44zM42.32 10.233h2.33v1.3h-2.33v2.79h2.5v1.32h-3.94v-5.87h3.94v1.46h-2.5zM48.24 15.963h-1.63l-2.09-5.81h1.48l1.42 4.1 1.42-4.1h1.48l-2.08 5.81zM51.52 10.233h1.44v5.73h-1.44z" fill="#fff"></path>
        <path d="M25.857 10.596c0-.535-.128-.99-.384-1.365s-.62-.644-1.085-.802a3.6 3.6 0 0 0-1.393-.242h-3.66v7.47h1.44V13.8h2.09c.427 0 .82-.045 1.18-.137a2.2 2.2 0 0 0 .897-.535c.23-.252.384-.572.46- .956.078-.384.116-.794.116-1.22v-.354zm-4.7-1.46h1.99c.744 0 1.282.097 1.615.29.333.192.5.526.5 1.002v.354c0 .475-.167.818-.5 1.02-.333.204-.872.308-1.616.308h-1.99v-2.974z" fill="#fff"></path>
        <path d="M9.782 12.3c0-1.455 1.23-2.685 2.685-2.685a2.6 2.6 0 0 1 1.83.76c.018.017.036.035.053.053l-.973.973a1.2 1.2 0 0 0-1.782.026 1.2 1.2 0 0 0 .32 1.69l1.44 1.09a2.7 2.7 0 0 1-1.57 5.053c-1.455 0-2.685-1.23-2.685-2.685m5.105-3.32c.3-.3.725-.335 1.06-.09.335.244.423.7.18 1.044l-2.17 3.165a1.2 1.2 0 0 0-.097 1.76c.46.46 1.23.495 1.725.09l3.182-2.607c.335-.278.8-.244 1.078.09.278.335.244.8-.09 1.078l-3.35 2.75a2.7 2.7 0 0 1-4.225-1.043L9.12 12.91a2.7 2.7 0 0 1 4.75-4.14l1.017.854zM5.592 10.126a2.7 2.7 0 0 1 3.81-3.81L11.77 8.68c.018.018.035.036.053.053l-.973.973A1.2 1.2 0 0 0 9.07 8.016l-2.73 2.73a1.2 1.2 0 0 0 1.7 1.7l1.016-.973a2.7 2.7 0 0 1 5.018-1.55l1.09 1.44a2.7 2.7 0 0 1-5.053 1.57L5.592 10.126z" fill="#fff"></path>
    </svg>
);

export const CoinflowIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.213 21.0188C15.1119 21.0188 17.5859 19.5398 18.7997 17.2188H15.6328C14.8691 18.2812 13.6553 18.9609 12.213 18.9609C9.73895 18.9609 7.75878 17.0098 7.75878 14.4727C7.75878 11.9355 9.73895 9.98438 12.213 9.98438C13.6553 9.98438 14.8691 10.6641 15.6328 11.7266H18.7997C17.5859 9.4043 15.1119 7.92578 12.213 7.92578C8.02801 7.92578 4.61621 10.875 4.61621 14.4727C4.61621 18.0703 8.02801 21.0188 12.213 21.0188Z" fill="currentColor"></path>
        <path d="M26.2148 20.6562V8.28906H23.0479V20.6562H26.2148Z" fill="currentColor"></path>
        <path d="M36.1044 21.0188C40.2894 21.0188 43.7012 18.0703 43.7012 14.4727C43.7012 10.875 40.2894 7.92578 36.1044 7.92578C31.9194 7.92578 28.5076 10.875 28.5076 14.4727C28.5076 18.0703 31.9194 21.0188 36.1044 21.0188ZM36.1044 18.9609C33.6304 18.9609 31.6502 17.0098 31.6502 14.4727C31.6502 11.9355 33.6304 9.98438 36.1044 9.98438C38.5784 9.98438 40.5586 11.9355 40.5586 14.4727C40.5586 17.0098 38.5784 18.9609 36.1044 18.9609Z" fill="currentColor"></path>
        <path d="M54.5446 8.28906H51.3776L46.3311 15.6914V8.28906H43.1641V20.6562H46.3311L51.3776 13.2539V20.6562H54.5446V8.28906Z" fill="currentColor"></path>
        <path d="M62.6562 20.6562V8.28906H59.4893V20.6562H62.6562Z" fill="currentColor"></path>
        <path d="M72.0833 20.6562V12.1875L68.8034 20.6562H65.8545L62.5746 12.1875V20.6562H59.4077V8.28906H64.082L67.3333 16.3594L70.5846 8.28906H75.2591V20.6562H72.0833Z" fill="currentColor"></path>
        <path d="M84.7792 14.4727L82.162 8.28906H78.8257L83.0107 17.2188H79.8438V20.6562H89.2709V17.2188H86.104L88.7212 11.0273L84.7792 14.4727Z" fill="currentColor"></path>
        <path d="M99.6484 20.6562V16.0234L95.2012 8.28906H92.2523L96.6995 16.0234V20.6562H99.6484Z" fill="currentColor"></path>
        <path d="M106.671 20.6562V13.8984H101.442V11.8359H109.838V13.8984H104.609V20.6562H101.442V18.5938H106.671V20.6562Z" fill="currentColor"></path>
        <path d="M101.442 13.8984H106.671V11.8359H101.442V13.8984Z" fill="currentColor"></path>
        <path d="M109.838 13.8984V11.8359H104.609V13.8984H109.838Z" fill="currentColor"></path>
        <path d="M115.54 20.6562V8.28906H112.373V20.6562H115.54Z" fill="currentColor"></path>
    </svg>
);

export const LockIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);

export const VisaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" aria-labelledby="pi-visa">
        <title id="pi-visa">Visa</title>
        <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#1A1F71"/>
        <path d="M14.6.4L9.2 23.6h4.1l5.4-23.2z" fill="#F7A600"/>
        <path d="M23.1 23.6h4.1L22 14.3c-.4-1.2-1.3-2.6-2.5-3.3-1.2-.7-2.8-1.1-4.6-1.1H3v23.2h4.1V12.2h2.3c1.5 0 2.7.3 3.6 1 .9.7 1.5 1.7 1.9 2.9L23.1 23.6z" fill="#1A1F71"/>
        <path d="M23.1 23.6h4.1L22 14.3c-.4-1.2-1.3-2.6-2.5-3.3-1.2-.7-2.8-1.1-4.6-1.1H3v23.2h4.1V12.2h2.3c1.5 0 2.7.3 3.6 1 .9.7 1.5 1.7 1.9 2.9L23.1 23.6z" fill="#FFF"/>
        <path d="M35.2.4L28.1 23.6h4.1l7.1-23.2z" fill="#1A1F71"/>
    </svg>
);


export const MastercardIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" aria-labelledby="pi-mastercard">
        <title id="pi-mastercard">Mastercard</title>
        <circle cx="15" cy="12" r="7" fill="#EB001B"/>
        <circle cx="23" cy="12" r="7" fill="#F79E1B" opacity=".8"/>
    </svg>
);


export const AmexIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" aria-labelledby="pi-amex">
        <title id="pi-amex">American Express</title>
        <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#0077C8"/>
        <path d="M10.9 12.2l-3.3 3.4L6 14.1l2-2.1-2-2.1 1.6-1.5 3.3 3.4zm10.3-3.3H15.9v1.6h5.3v1.6h-5.3v1.6h5.3v1.6H15.9V16h6.9v-1.6h-5.3v-1.6h5.3v-1.6h-5.3V9.2h6.9v1.6zm8.6-1.9h-3.3c-1.1 0-2.1.8-2.1 2.2v3.7c0 1.4 1 2.2 2.1 2.2h3.3v-1.6H27c-.4 0-.6-.3-.6-.7v-4c0-.4.2-.7.6-.7h2.8V7z" fill="#FFF"/>
    </svg>
);

export const DiscoverIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" aria-labelledby="pi-discover">
        <title id="pi-discover">Discover</title>
        <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#F68121"/>
        <path d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" fill="#FFF"/>
        <path d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" fill="none" stroke="#F68121" strokeWidth="2"/>
        <path d="M28.4 17.2h-2.1v-2.3h2.1c.3 0 .5-.2.5-.5V9.1c0-.3-.2-.5-.5-.5h-2.1V6.3h2.1c1.5 0 2.8 1.2 2.8 2.8v5.3c0 1.6-1.2 2.8-2.8 2.8z" fill="#FFF"/>
    </svg>
);
