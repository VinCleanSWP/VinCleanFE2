import React from 'react'
import SlideBar from '../components/ManagerUI/SlideBar'
import HeaderManager from '../components/ManagerUI/HeaderManager'
import { Route, Routes } from 'react-router-dom'

export default function Customer() {
  return (
    <div>
      <div class="d-flex" id="wrapper">
        <SlideBar />
        <div id="page-content-wrapper">
          <HeaderManager />
        </div>
      </div>
    </div>
  )
}
