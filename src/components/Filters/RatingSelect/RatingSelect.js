import { useRecommendationsFilters } from '../../../context/useRecommendationsFilters'
import "antd/dist/antd.css";
import { TreeSelect } from "antd";
import './styles.css'

export function RatingSelect() {
  const { 
    rating, 
    setRating, 
  } = useRecommendationsFilters()

  const ratingList = [
    { title: 'Compra', value: 'Compra' },
    { title: 'Venda', value: 'Venda' },
    { title: 'Neutro', value: 'Neutro' },
    { title: 'Revisão', value: 'Revisao' }
  ]

  return (
    <>
      <h1 style={{color: "var(--light-primary-color)", fontSize: 16}}>Rating</h1>
      <TreeSelect
        size="large"
        allowClear={true}
        placeholder="Selecione um Rating"
        treeCheckable={true}
        showCheckedStrategy={TreeSelect.SHOW_CHILD}
        style={{ width: "100%" }}
        dropdownStyle={{ maxHeight: "300px" }}
        onChange={value => setRating(value)}
        value={rating}
        maxTagCount={2}
        maxTagPlaceholder={omittedValues =>
          `+ ${omittedValues.length} ${omittedValues.length > 1 ? "Ratings" : "Rating"} ...`
        }
        treeData={[
          {
            title:
              rating.length > 0 ? (
                <span
                  onClick={() => setRating([])}
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
                  onClick={() => setRating(['Compra', 'Venda', 'Neutro', 'Revisao'])}
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
          ...ratingList
        ]}
      />
    </>
  )
}
