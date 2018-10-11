export default function () {
  return {
    path: '',//文件路径
    name: '',//组件名
    head: '查看续租订单详情-氪空间后台管理系统',
    ajaxUrl: '',
    bigClass: 'g-order-detail',
    bigTitle: '续租订单详情',
    params: [
      { goJavaName: 'id', type: 'params', pathName: 'watchView' } // type 分为params 和 query
    ],
    group: [
      {
        elGroup: {
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
          elGroup: {
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
              }

            ]
          },
          elGroup: {
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
          elGroup: {
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

        }
      }
    ]
  }
}