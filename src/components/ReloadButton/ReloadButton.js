import { Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons';
import { queryClient } from '../../services/queryClient';
import { useState } from 'react';



export function ReloadButton() {
  const [isRefeching, setIsRefeching] = useState(false)
  async function handleRefetchData() {
    setIsRefeching(true)
    await queryClient.refetchQueries({ stale: true})
    setIsRefeching(false)
  }
  return (
    <Button icon={<ReloadOutlined spin={isRefeching} />} type="primary" onClick={() => handleRefetchData()}>Tentar novamente</Button>
  )
}
