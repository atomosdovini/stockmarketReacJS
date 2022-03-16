import './styles.css'
import { Button, Input, Space } from 'antd';

const { Search } = Input;



export function StockSearch({
  handleStockSearch,   
  isButtonVisible,
  searchValue,
  setSearchValue
}) {
  return (
    <>
    <Space>
      <h1 style={{color: "var(--light-primary-color)", fontSize: 16}}>Ação</h1>
      <Button 
        type="link" 
        style={{
          visibility: isButtonVisible ? "visible" : "hidden", 
          marginBottom: 8, marginTop: 0, 
          padding: 0, 
          height: 25,
        }}
        onClick={() => handleStockSearch('')}
      >
        Limpar
      </Button>
    </Space>

    <Search
      value={searchValue}
      size="large"
      placeholder="Pesquise por uma Ação"
      onSearch={(ticket) => handleStockSearch(ticket)}
      onChange={(e) => setSearchValue(e.target.value)}
      enterButton
    />

    </>
  )
}

