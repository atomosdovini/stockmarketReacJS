import { useRecommendationsFilters } from '../../../context/useRecommendationsFilters'
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import './styles.css'
import { useResearchs } from '../../../hooks/useResearchs';
import { useEffect, useState} from 'react';

export function ResearchSelect() {

  const { research, setResearch } = useRecommendationsFilters()
  const [ researchList, setResearchList] = useState([])
  const {data} = useResearchs()

  useEffect(()=> {
    if(data) {
      // console.log(data)
      setResearchList(data)
    }
  }, [data])

	function handleResearchSelection(value) {
    const researchValues = value.map(({ value }) => value)
		setResearch(researchValues)
    
	}
 


	// function handleResearchSelection(value) {
	// 	let researchArray
	// 	const researchValues = researchList.reduce((acc, val) => {
	// 		if(value.includes(val.title)) {
	// 			researchArray = {
	// 				title: val.title,
	// 				value: val.value,
	// 				id: val.id
	// 			}
	// 			acc.push(researchArray)
					
	// 		}
	// 		return acc
	// 	}, [])
	// 	setResearch(researchValues)
  // }

  
  return (
    <div>
      <h1 style={{color: "var(--light-primary-color)", fontSize: 16}}>Research</h1>
      <TreeSelect      
        size="large"
        allowClear={true}
        placeholder="Selecione um Research"
        treeCheckable={true}
        showCheckedStrategy={TreeSelect.SHOW_CHILD}
        style={{ width: "462px" }}
        dropdownStyle={{ maxHeight: "300px" }}
        onChange={value => setResearch(value)}
        value={research}
        maxTagCount={8}
        maxTagPlaceholder={omittedValues =>
          `+ ${omittedValues.length} ${omittedValues.length > 1 ? "Researchs" : "Research"} ...`
        }
        treeData={[
          {
            title:
              research.length > 0 ? (
                <span
                  onClick={() => setResearch([])}
                  style={{
                    display: "inline-block",
                    color: "#286FBE",
                    cursor: "pointer"
                  }}
                >
                  Limpar
                </span>
              ) : (
                <span
                  onClick={() => handleResearchSelection(researchList)}
                  style={{
                    display: "inline-block",
                    color: "#286FBE",
                    cursor: "pointer"
                  }}
                >
                  Selecionar todos
                </span>
              ),
            value: "xxx",
            disableCheckbox: true,
            disabled: true
          },
          ...researchList 
        ]}
      />
  
    </div>
    
  )
}

