/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import DownloadList from '../DownloadList'

import {
  loadDownloadList,
  downloadFile
} from 'containers/App/actions'
import {
  makeSelectLoginUser,
  makeSelectDownloadList,
  makeSelectDownloadListLoading
} from 'containers/App/selectors'

import { Dropdown, Menu, Icon } from 'antd'
import { IDownloadRecord } from 'app/containers/App/types'

const styles = require('./Navigator.less')

const goGithub = () => window.open('https://github.com/edp963/davinci')
const goDoc = () => window.open('https://edp963.github.io/davinci/')

interface INavigatorProps {
  show: boolean
  loginUser: object
  downloadList: IDownloadRecord[]
  onLogout: () => void
  onLoadDownloadList: () => void
  onDownloadFile: (id) => void
}

export function Navigator (props: INavigatorProps) {
  const {
    show,
    downloadList,
    onLogout,
    onLoadDownloadList,
    onDownloadFile
  } = props
  const headerClass = classnames({
    [styles.header]: true,
    [styles.hide]: !show
  })
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/account" >
          用户设置
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a href="javascript:;" onClick={onLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <nav className={headerClass}>
      <div className={styles.logoPc}>
        <div className={styles.logo}>
          <Link to="/project/1">
            <img src={require('assets/images/logo.png')} />
          </Link>
        </div>
      </div>
      <div className={styles.title}>
        内蒙古统计 “一张图” 综合应用分析平台
      </div>
      <div className={styles.logoMobile}>
        <div className={styles.logo}>
          <Link to="/project/1">
            <img src={require('assets/images/logo.png')} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = createStructuredSelector({
  loginUser: makeSelectLoginUser(),
  downloadList: makeSelectDownloadList()
})

function mapDispatchToProps (dispatch) {
  return {
    onLoadDownloadList: () => dispatch(loadDownloadList()),
    onDownloadFile: (id) => dispatch(downloadFile(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)
