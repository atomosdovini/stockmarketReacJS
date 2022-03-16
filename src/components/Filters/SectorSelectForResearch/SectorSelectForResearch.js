import { useEffect, useState } from 'react';
import { useRecommendationsFilters } from '../../../context/useRecommendationsFilters'
import { useSectors } from "../../../hooks/useSectors";

import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import "./styles.css";


export function SectorSelectForResearch() {
	const { sector, setSector } = useRecommendationsFilters()
	const [sectorList, setSectorList] = useState([])
  const {data} = useSectors()

	useEffect(()=> {
		if(data) {
			setSectorList(data)
		}
	}, [data])

	function handleSectorSelection(value) {
		let sectorArray
		const sectorValues = sectorList.reduce((acc, val) => {
			if(value.includes(val.title)) {
				sectorArray = {
					title: val.title,
					value: val.value,
					id: val.id
				}
				acc.push(sectorArray)
					
			}
			return acc
		}, [])
		setSector(sectorValues)
	}

	return (
		<div>
			<h1 style={{ color: "var(--light-primary-color)", fontSize: 16 }}>Setores</h1>
			<TreeSelect
				size="large"
				allowClear={true}
				placeholder="Selecione um Setor"
				treeCheckable={true}
				showCheckedStrategy={TreeSelect.SHOW_CHILD}
				style={{ width: "462px" }}
				dropdownStyle={{ maxHeight: "300px" }}
				onChange={(value) => handleSectorSelection(value)}
				value={sector}
				maxTagCount={2}
        maxTagPlaceholder={omittedValues =>
          `+ ${omittedValues.length} ${omittedValues.length > 1 ? "Setores" : "Setor"} ...`
        }
				treeData={[
					{
						title:
							sector.length > 0 ? (
								<span
									onClick={() => setSector([])}
									style={{
										display: "inline-block",
										color: "#286FBE",
										cursor: "pointer",
									}}
								>
									Limpar
								</span>
							) : (
								<span
									onClick={() => setSector(sectorList)}
									style={{
										display: "inline-block",
										color: "#286FBE",
										cursor: "pointer",
									}}
								>
									Selecionar todos
								</span>
							),
						value: "xxx",
						disableCheckbox: true,
						disabled: true,
					},
					...sectorList,
				]}
			/>
		</div>
	);
}
