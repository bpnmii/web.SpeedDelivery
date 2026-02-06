import { SubHeader } from '@/components'
import { Card } from '@/components/Cards/Card'
import { Filters } from 'maxscalla-lib'

export const Home = () => {
  return (
    <>
      <SubHeader title="home" />

      <div className="max-container">
        <div style={{marginBottom: 20}}>
          <Filters onChangeFilters={function (c: string | undefined, v: string | undefined): void {
            throw new Error('Function not implemented.')
          } }  />
        </div>
        
        <Card />
      </div>
    </>
  )
}
