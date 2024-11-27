import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import ListItem from '@/helperComponents/ListItem';
import { ScrollView } from 'react-native-gesture-handler';

const TITLES = [
  'Record the dismissible tutorial',
  'Task 2',
  'Task 3',
  'Task 4',
  'Task 5',
  'Task 6',
  'Task 7',
]

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }))

const SwipeToDelete = () => {

  const [tasks, setTasks] = useState(TASKS)

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks( (tasks) => tasks.filter((t) => t.index !== task.index))
  }, [])

  const scrollRef = useRef(null)

  return (
    <SafeAreaView className='flex-1 bg-[#fafbff] w-full h-full'>
      <StatusBar style='auto' />
      <Text className='font-bold text-6xl my-6 pl-[5%]'>Tasks</Text>
      <ScrollView ref={scrollRef} className='flex-1'>
        {
          tasks.map((task) => (
            <ListItem simGesture={scrollRef} task={task} key={task.index} onDismiss={onDismiss} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default SwipeToDelete

const styles = StyleSheet.create({})