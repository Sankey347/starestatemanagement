import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../components/star_user/user'
import CLogin from '../components/star_user/clogin'
import Login from '../components/star_user/login'
import Register from '../components/star_user/register'
import UserIndex from '../components/star_web/index'
import WebIndex from '../components/star_web/web_index'
import ReadMessage from '../components/star_web/read_message'
import Payments from '../components/star_web/payments'
import Repairs from '../components/star_web/repairs'
import AdminIndex from '../components/star_func/index'
import StarData from '../components/star_func/star_data'
import StarAuthority from '../components/star_func/star_authority'
import StarProperty from '../components/star_func/star_property'
import StarService from '../components/star_func/star_service'
import StarSystem from '../components/star_func/star_system'
import DataShow from '../components/star_func/star_data/data_show'
import UserList from '../components/star_func/star_data/user_list'
import VisitorsRecord from '../components/star_func/star_data/visitors_record'
import Activity from '../components/star_func/star_service/activity'
import Message from '../components/star_func/star_service/message'
import Complaint from '../components/star_func/star_service/complaint'
import Maintain from '../components/star_func/star_service/maintain'
import Money from '../components/star_func/star_property/money'
import Car from '../components/star_func/star_property/car'
import House from '../components/star_func/star_property/house'
import PermissionSetting from "../components/star_func/star_authority/permission_setting"
import UserGroup from '../components/star_func/star_authority/user_group'
import SystemLog from '../components/star_func/star_system/system_log'
import SystemMonitoring from '../components/star_func/star_system/system_monitoring'
Vue.use(VueRouter)
export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component: UserIndex,
      name:'user_index',
      children: [
        {
          path: '',
          component: WebIndex,
          name: 'web_index'
        },
        {
          path: 'read',
          component: ReadMessage,
          name: 'read_message'
        },
        {
          path:'pay',
          component:Payments,
          name:'payments'
        },
        {
          path: 'repairs',
          component:Repairs,
          name: 'repairs'
        }
      ]
    },
    {
      path:'/admin',
      component:AdminIndex,
      name:'admin_index',
      children: [
        {
          path:'data',
          component: StarData,
          name: 'data',
          children:[
            {
              path:'show',
              component:DataShow,
              name:'data_show'
            },
             {
              path:'user',
              component:UserList,
              name:'user_list'
            },
            {
              path:'record',
              component:VisitorsRecord,
              name:'visitors_record'
            },
          ]
        },
        {
          path:'authority',
          component: StarAuthority,
          name: 'star_authority',
          children:[
            {
            path:'setting',
            component:PermissionSetting,
            name:'permission_setting'
          },
          {
            path:'group',
            component:UserGroup,
            name:'user_group'
          }
          ]
        },
        {
          path:'property',
          component:StarProperty ,
          name: 'star_property',
          children:[
            {
              path:'money',
              component:Money,
              name:'money'
            },
            {
              path:'car',
              component: Car,
              name:'car'
            },
            {
              path: 'house',
              component: House,
              name:'house'
            }
          ]
        },
        {
          path:'service',
          component: StarService,
          name: 'star_service',
          children:[
            {
              path:'activity',
              component: Activity,
              name:'activity'
            },
            {
            path:'complaint',
            component:Complaint,
            name:'complaint'
          },
            {
            path:'maintain',
            component:Maintain,
            name:'maintain'
          },
            {
              path:'message',
              component: Message,
              name:'message'
            }
          ]
        },
        {
          path:'system',
          component: StarSystem,
          name: 'star_system',
          children:[
            {
              path:'log',
              component:SystemLog,
              name:'system_log',
          },
            {
              path:'monitoring',
              component: SystemMonitoring,
              name:'system_monitoring'
            }
          ]
        },
      ]
    },
    {
      path: '/user',
      component: User,
      name:'user',
      children:[
        {
          path:'',
          name:'login',
          component:Login
      },
        {
          path:'clogin',
          name:'clogin',
          component:CLogin
      },
        {
          path:'register',
          name:'register',
          component:Register
        }
      ]
    },
  ]
})
