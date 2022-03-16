import { useRecommendationsFilters  } from '../../../context/useRecommendationsFilters'

import { DatePicker } from 'antd';
import './styles.css'

import moment from "moment";
import "moment/locale/pt-br";

const { RangePicker } = DatePicker;


function disabledFutureDate(current) {
  return current > moment().endOf('M')
}

export function DateSelect() {
  const {onDateSelection} = useRecommendationsFilters()
  
  return (
    <div>
      <h1 style={{color: "var(--light-primary-color)", fontSize: 16}}>Período</h1>
      <RangePicker 
        picker="month"
        format="DD/MM/YYYY"
        onChange={onDateSelection}
        disabledDate={current=>disabledFutureDate(current)}
        showNow={true}
        style={{ width: "100%" }}
        size="large"
      /> 
    </div>

  )
}
    
