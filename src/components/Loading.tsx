import { ReactElement } from 'react'

interface ILoading {
  active?: boolean
}

export const Loading = ({ active }: ILoading): ReactElement => (
  <div
    id="loading"
    className="d-flex-none h-100"
    style={{ display: active ? 'flex' : 'none' }}
  >
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000000,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="text-center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          fontSize: 16,
          backgroundColor: '#fff',
          padding: '5px 20px',
          borderRadius: 8,
          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="spinner-border spinner-border-sm">
          <span className="sr-only">Loading...</span>
        </div>
        <span>Aguarde...</span>
      </div>
    </div>
  </div>
)
