import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, message } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import useChannelList from '@/hooks/useChannelList'
import { getArticleListAPI, deleteArticleAPI } from '@/apis/article'
import { useState, useEffect } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigate = useNavigate()
    const articleStatus = {
        0: <Tag color="yellow">草稿</Tag>,
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="success">审核通过</Tag>,
        3: <Tag color="red">审核失败</Tag>,
        
    }
    // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => articleStatus[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      //dataIndex: 'id',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} 
            onClick={() => navigate(`/publish?id=${data.id}`)}/>
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<Popconfirm title="确定删除吗？" 
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleDelete(data)}>
                <DeleteOutlined />
                </Popconfirm>}
            />
          </Space>
        )
      }
    }
  ]
  
  const channelList = useChannelList()
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  const [requestParams, setRequestParams] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 10
  })

  useEffect(() => {
    const fetchArticleList = async () => {
      const res = await getArticleListAPI(requestParams)
      console.log(res)
      setArticleList(res.data.data.results)
      console.log('articleList', articleList)
      setCount(res.data.data.total_count)
    }
    fetchArticleList()
  }, [requestParams])

  const handleFinish = ({status, channel_id, date}) => {
    console.log('status', status)
    console.log('channel_id', channel_id)
    console.log('date', date)
    setRequestParams({
      ...requestParams,
      status,
      channel_id,
      begin_pubdate: date ? date[0].format('YYYY-MM-DD') : '',
      end_pubdate: date[1] ? date[1].format('YYYY-MM-DD') : ''
    })
  }

  const handleDelete = async (data) => {
    console.log('data', data)
    const res = await deleteArticleAPI(data.id)
    console.log('res', res)
    if(res.data.message === 'OK') {
      message.success('删除成功')
      setRequestParams({...requestParams})
    } else {
      message.error('删除失败')
    }
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={handleFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList?.map(item => 
                (<Option key={item.id} value={item.id}>{item.name}</Option>))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/*        */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} 
        pagination={{
          pageSize: requestParams.per_page,
          total: count,
          current: requestParams.page,
          onChange: (page) => {
            setRequestParams({...requestParams, page})
          }
        }}/>
      </Card>
    </div>
  )
}

export default Article