import { ResearchTable } from '../../components/Tables/ResearchTable/ResearchTable.js';
import { RatingLateralCards } from '../../components/RatingLateralCards/RatingLateralCards.js';
import { ResearchSelect } from '../../components/Filters/ResearchSelect/ResearchSelect.js';
import { SectorSelectForResearch } from '../../components/Filters/SectorSelectForResearch/SectorSelectForResearch.js';
import { RatingSelect } from '../../components/Filters/RatingSelect/RatingSelect.js';
import { DateSelect } from '../../components/Filters/DateSelect/DateSelect.js';

import { Space, Row, Col } from 'antd';


export function ResearchTablePageContent() {
  return (
    <Space 
      align="start" 
      size={46}
      style={{margin: "32px auto",marginLeft: "5%"}}
    >
      <Space          
        style={{margin: "0 auto"}}
        size="large"
        direction="vertical">
        <Space 
          style={{marginLeft: "32px"}}    
          size="large"
          direction="vertical"
        >
          <Row gutter={86}>
            <Col span={13}>
              <ResearchSelect />
            </Col>
            <Col span={11}>
              <DateSelect />
            </Col>
          </Row>
          <Row gutter={86}>
            <Col span={13}>
              <SectorSelectForResearch />
            </Col>
            <Col span={11}>
              <RatingSelect />
            </Col>
          </Row>
        </Space>
        <ResearchTable />
      </Space>
    <RatingLateralCards />
    </Space>
  )
}