import { useEffect, useState } from 'react'
import { Modal, Select, ConfigProvider } from 'antd'
import PubSub from 'pubsub-js'

interface SelectOption {
  value: string
  label: string
}
export function Prompt() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([])

  const getPromptList = async () => {
    const list = await window.Main.getPromptList()
    const options = list.map((item: { character: string }) => {
      return {
        label: item.character,
        value: item.character,
      }
    })
    setSelectOptions(options)
  }

  useEffect(() => {
    getPromptList()
    PubSub.subscribe('showPromptModal', () => {
      showModal()
    })
  }, [])

  const showModal = () => {
    setIsModalOpen(true)
    getPromptList()
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const onSearch = (value: string) => {
    console.log('search:', value)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(23, 10, 89)',
        },
      }}
    >
      <Modal
        title="Prompt Setting"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          showSearch
          defaultValue={'代码大神'}
          placeholder="Select a character"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          style={styles.inputWrap}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={selectOptions}
        />
      </Modal>
    </ConfigProvider>
  )
}

const styles = {
  inputWrap: {
    margin: '10px 0',
    width: '100%',
  },
}
