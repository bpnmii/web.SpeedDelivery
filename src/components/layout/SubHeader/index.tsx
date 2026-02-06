import { useContextSelector } from 'use-context-selector'
import * as S from './styles'
import { IFilters } from '../../../@types'
import { MainContext } from '../../../context/MainContext'
import DatePickerRange from '../../DatePickerRange'
import { ReactNode } from 'react'

interface SubHeaderProps {
  title: string
  dataInicial?: string
  dataFinal?: string
  changeFilters?: (value: IFilters) => void
  isDateDisabled?: boolean
  moreElements?: ReactNode
}

export const SubHeader = ({
  title,
  dataInicial,
  dataFinal,
  changeFilters,
  isDateDisabled = false,
  moreElements,
}: SubHeaderProps) => {
  const { mainDataInicial, mainDataFinal, mainChangeFilters } =
    useContextSelector(MainContext, (context) => {
      return {
        mainDataInicial: context.filters.dataInicial,
        mainDataFinal: context.filters.dataFinal,
        mainChangeFilters: context.changeFilters,
      }
    })

  return (
    <S.SubHeader>
      <div className="card card-custom">
        <div
          className="card-header min-h-55px"
          style={{ padding: '0 1.25rem' }}
        >
          <h3 className="card-title align-items-start flex-column mg-0">
            <span className="card-label fw-bold text-dark">{title}</span>
          </h3>
          <div className="card-toolbar mg-0">
            <div className="d-flex flex-row gap-20-px">
              {moreElements}

              {isDateDisabled ? null : (
                <DatePickerRange
                  id="range-date-table-home"
                  dataInicial={
                    changeFilters
                      ? dataInicial || mainDataInicial
                      : mainDataInicial
                  }
                  dataFinal={
                    changeFilters ? dataFinal || mainDataFinal : mainDataFinal
                  }
                  month
                  onChange={(dataInicial: string, dataFinal: string) => {
                    changeFilters
                      ? changeFilters({ dataInicial, dataFinal })
                      : mainChangeFilters({ dataInicial, dataFinal })
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </S.SubHeader>
  )
}
