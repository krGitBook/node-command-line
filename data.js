module.exports = function(){
  return {
    path: '',
    name: '',
    head: '查看续租订单详情-氪空间后台管理系统',
    ajaxUrl: 'join-bill-detail',
    bigTitle: '续租订单详情',
    params: [
      { goJavaName: 'id', type: 'params', pathName: 'watchView' }
    ],
    group: [
      {
        label: '基本信息',
        groupContent: [
          {
            label: '客户名称：',
            value: 'customerName',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '社区名称：',
            value: 'communityName',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '销售人员：',
            value: 'salerName',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '创建时间：',
            value: 'ctime',
            type: 'date',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '订单状态：',
            value: 'orderStatusName',
            style: {},
            on: {
              click: 'textClick',
            }
          },
        ],
      },
      {
        label: '客户主管理员信息',
        groupContent: [
          {
            label: '管理员手机号：',
            value: 'phone',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '管理员姓名：',
            value: 'name',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '管理员电子邮箱：',
            value: 'email',
            style: {},
            on: {
              click: 'textClick',
            }
          },
  
        ]
      },
      {
        label: '续租信息',
        groupContent: [
          {
            label: '续租开始日期：',
            value: 'startDate',
            type: 'date',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '续租结束日期：',
            value: 'endDate',
            type: 'date',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '分期方式：',
            value: 'installmentTypeName',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '首付款日期：',
            value: 'installmentTypeName',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '分期方式：',
            value: 'firstPayTime',
            type: 'date',
            style: {},
            on: {
              click: 'textClick',
            }
          }
        ]
      },
      {
        label: '金额信息',
        groupContent: [
          {
            label: '服务费总计：',
            value: 'seatRentAmount',
            style: {},
            on: {
              click: 'textClick',
            }
          },
          {
            label: '优惠总计：',
            value: 'tactiscAmount',
            style: {},
            on: {
              click: 'textClick',
            }
          },
  
        ]
      },
    ]
  }
}