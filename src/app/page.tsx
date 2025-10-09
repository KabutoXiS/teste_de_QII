'use client'

import { useState, useEffect } from 'react'
import { Brain, Star, Zap, Puzzle, Lightbulb, Clock, Lock, BarChart3, CheckCircle, Trophy, Share2 } from 'lucide-react'

// Tipos TypeScript
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: 'logic' | 'math' | 'pattern' | 'attention'
}

interface QuizState {
  currentQuestion: number
  answers: number[]
  showResult: boolean
  paymentCompleted: boolean
  iqScore: number
}

// 25 perguntas de QI variadas
const questions: Question[] = [
  {
    id: 1,
    question: "Qual número vem a seguir na sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    category: "logic"
  },
  {
    id: 2,
    question: "Se todos os gatos são animais e alguns animais são selvagens, então:",
    options: ["Todos os gatos são selvagens", "Alguns gatos podem ser selvagens", "Nenhum gato é selvagem", "Todos os animais são gatos"],
    correctAnswer: 1,
    category: "logic"
  },
  {
    id: 3,
    question: "Complete a sequência de cores: AZUL, VERDE, AMARELO, ?",
    options: ["VERMELHO", "LARANJA", "ROXO", "ROSA"],
    correctAnswer: 1,
    category: "pattern"
  },
  {
    id: 4,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas são necessárias para fazer 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correctAnswer: 0,
    category: "math"
  },
  {
    id: 5,
    question: "Qual palavra não pertence ao grupo: LIVRO, REVISTA, JORNAL, TELEVISÃO",
    options: ["LIVRO", "REVISTA", "JORNAL", "TELEVISÃO"],
    correctAnswer: 3,
    category: "logic"
  },
  {
    id: 6,
    question: "Complete a sequência: A, D, G, J, ?",
    options: ["K", "L", "M", "N"],
    correctAnswer: 2,
    category: "pattern"
  },
  {
    id: 7,
    question: "Um trem viaja 60 km em 45 minutos. Qual é sua velocidade em km/h?",
    options: ["75", "80", "85", "90"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 8,
    question: "Se CÓDIGO é para 35469 como BODE é para:",
    options: ["1643", "1463", "1346", "1634"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 9,
    question: "Qual é o próximo número: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "17"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 10,
    question: "Se você reorganizar as letras 'CIFAIPC', você obtém o nome de:",
    options: ["Um país", "Um animal", "Uma cor", "Uma profissão"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 11,
    question: "Quantos cubos pequenos há em um cubo 4x4x4?",
    options: ["48", "56", "64", "72"],
    correctAnswer: 2,
    category: "math"
  },
  {
    id: 12,
    question: "Complete: 16, 06, 68, 88, ?, 98",
    options: ["78", "80", "87", "90"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 13,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 14,
    question: "Qual número está faltando: 7, 14, 28, ?, 112",
    options: ["42", "49", "56", "63"],
    correctAnswer: 2,
    category: "math"
  },
  {
    id: 15,
    question: "Se MESA tem 4 letras e CADEIRA tem 7, quantas letras tem SOFÁ?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    category: "attention"
  },
  {
    id: 16,
    question: "Complete a analogia: ÁGUA está para SEDE como COMIDA está para:",
    options: ["FOME", "PRATO", "BOCA", "ESTÔMAGO"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 17,
    question: "Qual é o resultado de: 15 + 27 × 2 - 18 ÷ 3?",
    options: ["63", "65", "67", "69"],
    correctAnswer: 0,
    category: "math"
  },
  {
    id: 18,
    question: "Se você tem 6 maçãs e come 2, depois compra mais 4, quantas você tem?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 19,
    question: "Qual padrão segue a sequência: O, T, T, F, F, S, S, ?",
    options: ["E", "N", "O", "T"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 20,
    question: "Se um relógio marca 3:15, qual é o ângulo entre os ponteiros?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 21,
    question: "Complete: SEGUNDA, TERÇA, ?, QUINTA",
    options: ["QUARTA", "SEXTA", "SÁBADO", "DOMINGO"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 22,
    question: "Se 3x + 7 = 22, qual é o valor de x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    category: "math"
  },
  {
    id: 23,
    question: "Quantas palavras de 3 letras podem ser formadas com A, B, C (sem repetição)?",
    options: ["3", "6", "9", "12"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 24,
    question: "Se AMOR é escrito como 1-13-15-18, como seria escrito VIDA?",
    options: ["22-9-4-1", "22-9-3-1", "21-9-4-1", "21-8-4-1"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 25,
    question: "Qual é o próximo na sequência: 2, 5, 11, 23, ?",
    options: ["35", "41", "47", "53"],
    correctAnswer: 2,
    category: "logic"
  }
]

export default function IQTestPage() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    showResult: false,
    paymentCompleted: false,
    iqScore: 0
  })
  
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'payment' | 'result'>('home')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Verificar se o pagamento foi concluído ao carregar a página
  useEffect(() => {
    const paymentStatus = localStorage.getItem('iq-test-payment')
    const savedAnswers = localStorage.getItem('iq-test-answers')
    
    if (paymentStatus === 'completed' && savedAnswers) {
      const answers = JSON.parse(savedAnswers)
      const iqScore = calculateIQ(answers)
      setQuizState({
        currentQuestion: 24,
        answers,
        showResult: true,
        paymentCompleted: true,
        iqScore
      })
      setCurrentScreen('result')
      // Limpar dados após mostrar resultado
      localStorage.removeItem('iq-test-payment')
      localStorage.removeItem('iq-test-answers')
    }
  }, [])

  // Resetar seleção ao mudar pergunta
  useEffect(() => {
    setSelectedAnswer(null)
  }, [quizState.currentQuestion])

  const startQuiz = () => {
    setCurrentScreen('quiz')
    setQuizState({
      currentQuestion: 0,
      answers: [],
      showResult: false,
      paymentCompleted: false,
      iqScore: 0
    })
    // Limpar dados anteriores
    localStorage.removeItem('iq-test-payment')
    localStorage.removeItem('iq-test-answers')
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...quizState.answers]
    newAnswers[quizState.currentQuestion] = selectedAnswer ?? -1

    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers
      })
    } else {
      // Quiz finalizado - salvar respostas
      const iqScore = calculateIQ(newAnswers)
      localStorage.setItem('iq-test-answers', JSON.stringify(newAnswers))
      setQuizState({
        ...quizState,
        answers: newAnswers,
        iqScore,
        showResult: true
      })
      setCurrentScreen('payment')
    }
  }

  const calculateIQ = (answers: number[]): number => {
    let correctAnswers = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++
      }
    })
    
    // Fórmula simplificada de QI baseada na porcentagem de acertos
    const percentage = (correctAnswers / questions.length) * 100
    let iq = 70 + (percentage * 0.6) // Base 70, máximo ~130
    
    // Adicionar variação aleatória para parecer mais realista
    iq += Math.random() * 10 - 5
    
    return Math.round(Math.max(70, Math.min(160, iq)))
  }

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 0.99,
          description: 'Resultado do Teste de QI'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Dados do pagamento:', data)
        
        // Redirecionar para o checkout do Mercado Pago
        // Priorizar sandbox_init_point para ambiente de teste
        let checkoutUrl
        if (data.is_test && data.sandbox_init_point) {
          checkoutUrl = data.sandbox_init_point
        } else {
          checkoutUrl = data.init_point
        }
        
        if (checkoutUrl) {
          console.log('Redirecionando para:', checkoutUrl)
          window.location.href = checkoutUrl
        } else {
          throw new Error('URL de checkout não encontrada')
        }
      } else {
        throw new Error('Erro ao criar preferência de pagamento')
      }
    } catch (error) {
      console.error('Erro no pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
      setIsProcessingPayment(false)
    }
  }

  const getIQFeedback = (iq: number): string => {
    if (iq >= 140) return "Excepcional! Seu QI está no topo de 1% da população mundial. Você possui inteligência superior!"
    if (iq >= 130) return "Muito superior! Seu QI está acima de 98% das pessoas. Excelente capacidade de raciocínio!"
    if (iq >= 120) return "Superior! Seu QI está acima de 90% da população. Você tem ótima capacidade analítica!"
    if (iq >= 110) return "Acima da média! Seu QI está acima de 75% das pessoas. Bom raciocínio lógico!"
    if (iq >= 90) return "Média! Seu QI está na faixa normal da população. Continue exercitando sua mente!"
    return "Abaixo da média, mas não se preocupe! A inteligência pode ser desenvolvida com prática e estudo!"
  }

  const shareResult = () => {
    const text = `Acabei de fazer um teste de QI e meu resultado foi ${quizState.iqScore}! ${getIQFeedback(quizState.iqScore)}`
    if (navigator.share) {
      navigator.share({
        title: 'Meu Resultado do Teste de QI',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Resultado copiado para a área de transferência!')
    }
  }

  // Landing Page Principal
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        {/* Hero Section com Gradiente */}
        <div className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] relative overflow-hidden">
          {/* Formas geométricas de fundo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rotate-45"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white"></div>
            <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white transform rotate-45"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
            {/* Ícone do cérebro digital */}
            <div className="mb-8 animate-pulse">
              <Brain className="w-24 h-24 md:w-32 md:h-32 text-white mx-auto mb-4" />
            </div>
            
            {/* Título principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-inter leading-tight">
              Descubra agora seu verdadeiro nível de inteligência!
            </h1>
            
            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto font-inter">
              Baseado em perguntas de lógica e raciocínio, este teste rápido revela seu QI estimado em menos de 5 minutos.
            </p>
            
            {/* CTA Principal */}
            <button
              onClick={startQuiz}
              className="bg-white text-[#2563EB] font-bold text-xl px-12 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
            >
              COMEÇAR TESTE AGORA
            </button>
            
            <p className="text-white/80 text-sm mt-4">
              Mais de 10.000 pessoas já testaram sua inteligência com este desafio.
            </p>
          </div>
        </div>

        {/* Seção: Por que fazer este teste */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
              Por que fazer este teste?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Star className="w-12 h-12 text-[#2563EB] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-3">Avalie sua capacidade</h3>
                <p className="text-gray-600 text-sm">de raciocínio lógico e memória</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Zap className="w-12 h-12 text-[#A78BFA] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-3">Compare seu resultado</h3>
                <p className="text-gray-600 text-sm">com a média nacional</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Puzzle className="w-12 h-12 text-[#2563EB] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-3">Receba um relatório</h3>
                <p className="text-gray-600 text-sm">com sua pontuação estimada</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <Lightbulb className="w-12 h-12 text-[#A78BFA] mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-3">Descubra se você está</h3>
                <p className="text-gray-600 text-sm">entre os 3% com QI acima da média</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Instruções */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                Como funciona o teste
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Clock className="w-16 h-16 text-[#2563EB] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Duração média</h3>
                  <p className="text-gray-600">3 a 5 minutos</p>
                </div>
                
                <div className="text-center">
                  <Lock className="w-16 h-16 text-[#A78BFA] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Seus dados são</h3>
                  <p className="text-gray-600">totalmente confidenciais</p>
                </div>
                
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-[#2563EB] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Resultado exibido</h3>
                  <p className="text-gray-600">ao final do teste</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Pronto para descobrir seu QI?
            </h2>
            
            <button
              onClick={startQuiz}
              className="bg-white text-[#2563EB] font-bold text-2xl px-16 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6"
            >
              COMEÇAR TESTE AGORA
            </button>
            
            <p className="text-white/90 text-lg">
              Mais de 10.000 pessoas já testaram sua inteligência com este desafio.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-4">Teste de QI Online © 2025 — Todos os direitos reservados.</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Tela do Quiz
  if (currentScreen === 'quiz') {
    const currentQ = questions[quizState.currentQuestion]
    const progress = ((quizState.currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-[#F9FAFB] p-4">
        <div className="max-w-3xl mx-auto">
          {/* Header com progresso */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-800 font-semibold">
                Pergunta {quizState.currentQuestion + 1} de {questions.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#2563EB] h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pergunta */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 font-inter">
              {currentQ.question}
            </h2>
            
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]'
                      : 'border-gray-200 hover:border-[#2563EB]/50 text-gray-800'
                  }`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedAnswer !== null
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {quizState.currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Pagamento
  if (currentScreen === 'payment') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-[#FACC15] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Parabéns! Teste Concluído
              </h2>
              <p className="text-gray-600">
                Você respondeu todas as 25 perguntas
              </p>
            </div>
            
            <div className="bg-[#F9FAFB] rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Para ver o resultado do seu QI, pague apenas:
              </h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">
                R$ 0,99
              </div>
              <p className="text-sm text-gray-600">
                Pagamento único • Resultado imediato
              </p>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={isProcessingPayment}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </div>
              ) : (
                'Pagar R$ 0,99 para ver meu resultado'
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              Pagamento 100% seguro com Mercado Pago
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Resultado
  if (currentScreen === 'result') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#7C3AED] to-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-white">
                  {quizState.iqScore}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Seu QI é {quizState.iqScore}
              </h2>
              
              <div className="bg-[#F9FAFB] rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {getIQFeedback(quizState.iqScore)}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#F9FAFB] rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Acertos</h4>
                <p className="text-2xl font-bold text-[#2563EB]">
                  {quizState.answers.filter((answer, index) => answer === questions[index].correctAnswer).length}/25
                </p>
              </div>
              <div className="bg-[#F9FAFB] rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Percentil</h4>
                <p className="text-2xl font-bold text-[#7C3AED]">
                  {Math.round(((quizState.iqScore - 70) / 60) * 100)}%
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={shareResult}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar meu resultado
              </button>
              
              <button
                onClick={() => setCurrentScreen('home')}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Fazer novo teste
              </button>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Este teste é apenas para fins de entretenimento. Resultados não substituem testes oficiais de QI.
          </p>
        </footer>
      </div>
    )
  }

  return null
}