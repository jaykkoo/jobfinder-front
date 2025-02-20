import Card from '../components/Card';

export default function Home() {
    return(
        <div className='mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card />
            <Card />
        </div>
    )
}
